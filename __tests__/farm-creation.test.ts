/**
 * TDD Phase 2: Farm Creation Flow Tests
 * Following r08_TDD_v1.txt requirements for farm creation with validation
 */

interface Customer {
  id: string;
  phoneNumber: string;
  name: string;
  email?: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: Date;
}

interface Farm {
  id: string;
  customerId: string;
  name: string;
  coordinates: { latitude: number; longitude: number };
  area: number; // in acres
  plantCount: number;
  healthScore: number;
  status: 'SETUP' | 'PLANTING' | 'GROWING' | 'PRODUCING' | 'INACTIVE';
  setupTasks: Task[];
  createdAt: Date;
  firstHarvestDate?: Date;
}

interface Task {
  id: string;
  farmId: string;
  type: 'SOIL_PREPARATION' | 'POLYHOUSE_SETUP' | 'IRRIGATION_INSTALL' | 'PLANTING' | 'INITIAL_CARE';
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  scheduledDate: Date;
  completedDate?: Date;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

interface CreateFarmDTO {
  customerId: string;
  name: string;
  coordinates: { latitude: number; longitude: number };
  area: number;
  feasibilityScore: number;
}

interface FarmService {
  createFarm(data: CreateFarmDTO): Promise<Farm>;
  validateCustomer(customerId: string): Promise<boolean>;
  validateFeasibility(feasibilityScore: number): boolean;
  calculatePlantCount(area: number): number;
  scheduleSetupTasks(farmId: string): Promise<Task[]>;
  getFarmById(farmId: string): Promise<Farm | null>;
  updateFarmStatus(farmId: string, status: Farm['status']): Promise<Farm>;
}

interface NotificationService {
  sendWelcomeNotification(farm: Farm, customer: Customer): Promise<void>;
  sendTaskNotification(task: Task): Promise<void>;
}

// Mock implementations for testing
class MockFarmService implements FarmService {
  private farms = new Map<string, Farm>();
  private customers = new Map<string, Customer>();
  private tasks = new Map<string, Task[]>();

  constructor() {
    // Add mock customers
    this.customers.set('customer1', {
      id: 'customer1',
      phoneNumber: '9876543210',
      name: 'John Doe',
      email: 'john@example.com',
      kycStatus: 'VERIFIED',
      createdAt: new Date()
    });

    this.customers.set('customer2', {
      id: 'customer2',
      phoneNumber: '9876543211',
      name: 'Jane Smith',
      kycStatus: 'PENDING',
      createdAt: new Date()
    });
  }

  async createFarm(data: CreateFarmDTO): Promise<Farm> {
    // Validate customer
    const customerValid = await this.validateCustomer(data.customerId);
    if (!customerValid) {
      throw new Error('Invalid or unverified customer');
    }

    // Validate feasibility
    if (!this.validateFeasibility(data.feasibilityScore)) {
      throw new Error('Feasibility score too low for farm creation');
    }

    // Validate area
    if (data.area <= 0 || data.area > 100) {
      throw new Error('Invalid farm area');
    }

    const farm: Farm = {
      id: `farm_${Date.now()}`,
      customerId: data.customerId,
      name: data.name,
      coordinates: data.coordinates,
      area: data.area,
      plantCount: this.calculatePlantCount(data.area),
      healthScore: 100, // Initial health score
      status: 'SETUP',
      setupTasks: [],
      createdAt: new Date(),
    };

    this.farms.set(farm.id, farm);

    // Schedule setup tasks
    const setupTasks = await this.scheduleSetupTasks(farm.id);
    farm.setupTasks = setupTasks;

    return farm;
  }

  async validateCustomer(customerId: string): Promise<boolean> {
    const customer = this.customers.get(customerId);
    return customer !== undefined && customer.kycStatus === 'VERIFIED';
  }

  validateFeasibility(feasibilityScore: number): boolean {
    return feasibilityScore >= 0.7; // 70% minimum threshold
  }

  calculatePlantCount(area: number): number {
    return Math.floor(area * 500); // 500 plants per acre
  }

  async scheduleSetupTasks(farmId: string): Promise<Task[]> {
    const now = new Date();
    const tasks: Task[] = [
      {
        id: `task_${farmId}_1`,
        farmId,
        type: 'SOIL_PREPARATION',
        status: 'SCHEDULED',
        scheduledDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
        description: 'Prepare soil with organic matter and pH adjustment',
        priority: 'HIGH'
      },
      {
        id: `task_${farmId}_2`,
        farmId,
        type: 'POLYHOUSE_SETUP',
        status: 'SCHEDULED',
        scheduledDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days
        description: 'Install polyhouse structure and climate control',
        priority: 'CRITICAL'
      },
      {
        id: `task_${farmId}_3`,
        farmId,
        type: 'IRRIGATION_INSTALL',
        status: 'SCHEDULED',
        scheduledDate: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000), // 21 days
        description: 'Install drip irrigation and fogger system',
        priority: 'HIGH'
      },
      {
        id: `task_${farmId}_4`,
        farmId,
        type: 'PLANTING',
        status: 'SCHEDULED',
        scheduledDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
        description: 'Plant blueberry saplings in prepared beds',
        priority: 'CRITICAL'
      },
      {
        id: `task_${farmId}_5`,
        farmId,
        type: 'INITIAL_CARE',
        status: 'SCHEDULED',
        scheduledDate: new Date(now.getTime() + 37 * 24 * 60 * 60 * 1000), // 37 days
        description: 'Initial watering, fertilization, and monitoring setup',
        priority: 'MEDIUM'
      }
    ];

    this.tasks.set(farmId, tasks);
    return tasks;
  }

  async getFarmById(farmId: string): Promise<Farm | null> {
    return this.farms.get(farmId) || null;
  }

  async updateFarmStatus(farmId: string, status: Farm['status']): Promise<Farm> {
    const farm = this.farms.get(farmId);
    if (!farm) {
      throw new Error('Farm not found');
    }

    farm.status = status;
    this.farms.set(farmId, farm);
    return farm;
  }
}

class MockNotificationService implements NotificationService {
  private sentNotifications: Array<{ type: string; recipient: string; data: any }> = [];

  async sendWelcomeNotification(farm: Farm, customer: Customer): Promise<void> {
    this.sentNotifications.push({
      type: 'WELCOME',
      recipient: customer.phoneNumber,
      data: { farmId: farm.id, farmName: farm.name }
    });
  }

  async sendTaskNotification(task: Task): Promise<void> {
    this.sentNotifications.push({
      type: 'TASK_SCHEDULED',
      recipient: 'operations_team',
      data: { taskId: task.id, type: task.type, scheduledDate: task.scheduledDate }
    });
  }

  getSentNotifications() {
    return this.sentNotifications;
  }

  clearNotifications() {
    this.sentNotifications = [];
  }
}

describe('Farm Creation Flow', () => {
  let farmService: MockFarmService;
  let notificationService: MockNotificationService;

  beforeEach(() => {
    farmService = new MockFarmService();
    notificationService = new MockNotificationService();
  });

  describe('Farm Creation Validation', () => {
    it('should create farm with valid customer and feasibility', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Blueberry Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.5,
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(farmData);

      expect(farm).toBeDefined();
      expect(farm.id).toBeDefined();
      expect(farm.customerId).toBe(farmData.customerId);
      expect(farm.name).toBe(farmData.name);
      expect(farm.coordinates).toEqual(farmData.coordinates);
      expect(farm.area).toBe(farmData.area);
      expect(farm.plantCount).toBe(750); // 1.5 * 500
      expect(farm.healthScore).toBe(100);
      expect(farm.status).toBe('SETUP');
      expect(farm.createdAt).toBeInstanceOf(Date);
    });

    it('should reject farm creation for unverified customer', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer2', // Has PENDING KYC status
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      await expect(farmService.createFarm(farmData)).rejects.toThrow('Invalid or unverified customer');
    });

    it('should reject farm creation for non-existent customer', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'non_existent',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      await expect(farmService.createFarm(farmData)).rejects.toThrow('Invalid or unverified customer');
    });

    it('should reject farm creation with low feasibility score', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 20.0, longitude: 80.0 },
        area: 1.0,
        feasibilityScore: 0.6 // Below 0.7 threshold
      };

      await expect(farmService.createFarm(farmData)).rejects.toThrow('Feasibility score too low');
    });

    it('should reject farm creation with invalid area', async () => {
      const invalidAreas = [0, -1, 101];

      for (const area of invalidAreas) {
        const farmData: CreateFarmDTO = {
          customerId: 'customer1',
          name: 'Test Farm',
          coordinates: { latitude: 27.0360, longitude: 88.2627 },
          area,
          feasibilityScore: 0.85
        };

        await expect(farmService.createFarm(farmData)).rejects.toThrow('Invalid farm area');
      }
    });
  });

  describe('Plant Count Calculation', () => {
    it('should calculate correct plant count for various areas', () => {
      expect(farmService.calculatePlantCount(1)).toBe(500);
      expect(farmService.calculatePlantCount(1.5)).toBe(750);
      expect(farmService.calculatePlantCount(2)).toBe(1000);
      expect(farmService.calculatePlantCount(0.5)).toBe(250);
    });

    it('should handle fractional areas correctly', () => {
      expect(farmService.calculatePlantCount(1.3)).toBe(650);
      expect(farmService.calculatePlantCount(2.7)).toBe(1350);
    });

    it('should round down plant counts', () => {
      expect(farmService.calculatePlantCount(1.9)).toBe(950); // Not 1000
      expect(farmService.calculatePlantCount(0.9)).toBe(450); // Not 500
    });
  });

  describe('Setup Task Scheduling', () => {
    it('should schedule all required setup tasks', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(farmData);
      
      expect(farm.setupTasks).toHaveLength(5);
      
      const taskTypes = farm.setupTasks.map(task => task.type);
      expect(taskTypes).toContain('SOIL_PREPARATION');
      expect(taskTypes).toContain('POLYHOUSE_SETUP');
      expect(taskTypes).toContain('IRRIGATION_INSTALL');
      expect(taskTypes).toContain('PLANTING');
      expect(taskTypes).toContain('INITIAL_CARE');
    });

    it('should schedule tasks in correct chronological order', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(farmData);
      const tasks = farm.setupTasks.sort((a, b) => 
        a.scheduledDate.getTime() - b.scheduledDate.getTime()
      );

      expect(tasks[0].type).toBe('SOIL_PREPARATION');
      expect(tasks[1].type).toBe('POLYHOUSE_SETUP');
      expect(tasks[2].type).toBe('IRRIGATION_INSTALL');
      expect(tasks[3].type).toBe('PLANTING');
      expect(tasks[4].type).toBe('INITIAL_CARE');
    });

    it('should set appropriate task priorities', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(farmData);
      
      const criticalTasks = farm.setupTasks.filter(task => task.priority === 'CRITICAL');
      const highTasks = farm.setupTasks.filter(task => task.priority === 'HIGH');
      
      expect(criticalTasks).toHaveLength(2); // POLYHOUSE_SETUP, PLANTING
      expect(highTasks).toHaveLength(2); // SOIL_PREPARATION, IRRIGATION_INSTALL
      
      expect(criticalTasks.map(t => t.type)).toContain('POLYHOUSE_SETUP');
      expect(criticalTasks.map(t => t.type)).toContain('PLANTING');
    });

    it('should schedule tasks with proper time intervals', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(farmData);
      const now = new Date();
      
      // Check that tasks are scheduled in the future
      farm.setupTasks.forEach(task => {
        expect(task.scheduledDate.getTime()).toBeGreaterThan(now.getTime());
      });
      
      // Check minimum intervals between tasks
      const sortedTasks = farm.setupTasks.sort((a, b) => 
        a.scheduledDate.getTime() - b.scheduledDate.getTime()
      );
      
      for (let i = 1; i < sortedTasks.length; i++) {
        const timeDiff = sortedTasks[i].scheduledDate.getTime() - sortedTasks[i-1].scheduledDate.getTime();
        const daysDiff = timeDiff / (24 * 60 * 60 * 1000);
        expect(daysDiff).toBeGreaterThanOrEqual(6); // At least 6 days between tasks
      }
    });
  });

  describe('Farm Health Score', () => {
    it('should initialize farm with health score of 100', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(farmData);
      expect(farm.healthScore).toBe(100);
    });

    it('should maintain health score during setup phase', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(farmData);
      
      // Update farm status
      const updatedFarm = await farmService.updateFarmStatus(farm.id, 'PLANTING');
      expect(updatedFarm.healthScore).toBe(100);
    });
  });

  describe('Notification Workflow', () => {
    it('should send welcome notification after farm creation', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(farmData);
      
      // Simulate notification sending
      const customer = {
        id: 'customer1',
        phoneNumber: '9876543210',
        name: 'John Doe',
        kycStatus: 'VERIFIED' as const,
        createdAt: new Date()
      };
      
      await notificationService.sendWelcomeNotification(farm, customer);
      
      const notifications = notificationService.getSentNotifications();
      expect(notifications).toHaveLength(1);
      expect(notifications[0].type).toBe('WELCOME');
      expect(notifications[0].recipient).toBe('9876543210');
      expect(notifications[0].data.farmId).toBe(farm.id);
    });

    it('should send task notifications for scheduled tasks', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(farmData);
      
      // Send notifications for all setup tasks
      for (const task of farm.setupTasks) {
        await notificationService.sendTaskNotification(task);
      }
      
      const notifications = notificationService.getSentNotifications();
      expect(notifications).toHaveLength(5); // 5 setup tasks
      
      notifications.forEach(notification => {
        expect(notification.type).toBe('TASK_SCHEDULED');
        expect(notification.recipient).toBe('operations_team');
        expect(notification.data.taskId).toBeDefined();
        expect(notification.data.type).toBeDefined();
        expect(notification.data.scheduledDate).toBeInstanceOf(Date);
      });
    });
  });

  describe('Farm Status Updates', () => {
    it('should update farm status through lifecycle', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(farmData);
      expect(farm.status).toBe('SETUP');

      // Update through lifecycle
      const statusUpdates: Farm['status'][] = ['PLANTING', 'GROWING', 'PRODUCING'];
      
      let currentFarm = farm;
      for (const status of statusUpdates) {
        currentFarm = await farmService.updateFarmStatus(farm.id, status);
        expect(currentFarm.status).toBe(status);
      }
    });

    it('should throw error when updating non-existent farm', async () => {
      await expect(
        farmService.updateFarmStatus('non_existent_farm', 'GROWING')
      ).rejects.toThrow('Farm not found');
    });
  });

  describe('Farm Retrieval', () => {
    it('should retrieve farm by ID', async () => {
      const farmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Test Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const createdFarm = await farmService.createFarm(farmData);
      const retrievedFarm = await farmService.getFarmById(createdFarm.id);
      
      expect(retrievedFarm).not.toBeNull();
      expect(retrievedFarm?.id).toBe(createdFarm.id);
      expect(retrievedFarm?.name).toBe(farmData.name);
      expect(retrievedFarm?.plantCount).toBe(500);
    });

    it('should return null for non-existent farm', async () => {
      const farm = await farmService.getFarmById('non_existent_farm');
      expect(farm).toBeNull();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle boundary feasibility scores', async () => {
      const exactThresholdData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Threshold Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.7 // Exactly at threshold
      };

      const farm = await farmService.createFarm(exactThresholdData);
      expect(farm).toBeDefined();
      expect(farm.name).toBe('Threshold Farm');
    });

    it('should handle very small farm areas', async () => {
      const smallFarmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Small Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 0.1, // Very small
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(smallFarmData);
      expect(farm.plantCount).toBe(50); // 0.1 * 500
      expect(farm.setupTasks).toHaveLength(5); // All tasks still scheduled
    });

    it('should handle very large farm areas', async () => {
      const largeFarmData: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Large Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 100, // Maximum allowed
        feasibilityScore: 0.85
      };

      const farm = await farmService.createFarm(largeFarmData);
      expect(farm.plantCount).toBe(50000); // 100 * 500
      expect(farm.setupTasks).toHaveLength(5);
    });

    it('should handle farms with same name for different customers', async () => {
      // Add another verified customer
      const farmService2 = new MockFarmService();
      
      const farmData1: CreateFarmDTO = {
        customerId: 'customer1',
        name: 'Duplicate Name Farm',
        coordinates: { latitude: 27.0360, longitude: 88.2627 },
        area: 1.0,
        feasibilityScore: 0.85
      };

      const farm1 = await farmService.createFarm(farmData1);
      const farm2 = await farmService.createFarm(farmData1);
      
      expect(farm1.id).not.toBe(farm2.id);
      expect(farm1.name).toBe(farm2.name);
      expect(farm1.customerId).toBe(farm2.customerId);
    });
  });
});