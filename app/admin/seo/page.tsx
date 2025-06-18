"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, TrendingUp, MapPin, Target, Plus, RefreshCw } from "lucide-react";

interface SEOPage {
  slug: string;
  template: string;
  state: string;
  city: string;
  district: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

interface SEOStats {
  totalPages: number;
  byTemplate: Record<string, number>;
  byState: Record<string, number>;
  lastGenerated: string;
}

const SEOAdminPage = () => {
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [stats, setStats] = useState<SEOStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('all');

  const fetchSEOData = React.useCallback(async () => {
    try {
      const response = await fetch('/api/seo/generate-pages');
      const data = await response.json();
      
      if (data.success) {
        setPages(data.pages || []);
        calculateStats(data.pages || []);
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSEOData();
  }, [fetchSEOData]);

  const calculateStats = (pagesData: SEOPage[]) => {
    const byTemplate: Record<string, number> = {};
    const byState: Record<string, number> = {};
    
    pagesData.forEach(page => {
      byTemplate[page.template] = (byTemplate[page.template] || 0) + 1;
      byState[page.state] = (byState[page.state] || 0) + 1;
    });

    setStats({
      totalPages: pagesData.length,
      byTemplate,
      byState,
      lastGenerated: new Date().toISOString()
    });
  };

  const generatePages = async (limit?: number) => {
    setGenerating(true);
    try {
      const response = await fetch('/api/seo/generate-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'all', limit })
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchSEOData();
        alert(`Successfully generated ${data.pagesGenerated} SEO pages!`);
      } else {
        alert('Failed to generate pages: ' + data.error);
      }
    } catch (error) {
      console.error('Error generating pages:', error);
      alert('Error generating pages');
    } finally {
      setGenerating(false);
    }
  };

  const filteredPages = pages.filter(page => {
    const stateMatch = selectedState === 'all' || page.state === selectedState;
    const templateMatch = selectedTemplate === 'all' || page.template === selectedTemplate;
    return stateMatch && templateMatch;
  });

  const uniqueStates = [...new Set(pages.map(p => p.state))];
  const uniqueTemplates = [...new Set(pages.map(p => p.template))];

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading SEO dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">SEO Management Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage programmatic SEO pages for Northeast India blueberry farming
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Button 
          onClick={() => generatePages(50)}
          disabled={generating}
          className="h-16"
        >
          <Plus className="h-5 w-5 mr-2" />
          Generate 50 Pages
        </Button>
        
        <Button 
          onClick={() => generatePages(200)}
          disabled={generating}
          variant="outline"
          className="h-16"
        >
          <FileText className="h-5 w-5 mr-2" />
          Generate 200 Pages
        </Button>
        
        <Button 
          onClick={() => generatePages()}
          disabled={generating}
          variant="outline"
          className="h-16"
        >
          <Target className="h-5 w-5 mr-2" />
          Generate All Pages
        </Button>
        
        <Button 
          onClick={fetchSEOData}
          disabled={generating}
          variant="outline"
          className="h-16"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Refresh Data
        </Button>
      </div>

      {generating && (
        <Alert className="mb-6">
          <AlertTitle>Generating SEO Pages...</AlertTitle>
          <AlertDescription>
            This may take a few minutes. Please don't close this page.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPages || 0}</div>
            <p className="text-xs text-muted-foreground">SEO landing pages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">States Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueStates.length}</div>
            <p className="text-xs text-muted-foreground">Northeast states</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueTemplates.length}</div>
            <p className="text-xs text-muted-foreground">Page templates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Target keyword coverage</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pages" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Generated SEO Pages
              </CardTitle>
              <CardDescription>
                All programmatically generated landing pages for Northeast India
              </CardDescription>
              
              {/* Filters */}
              <div className="flex gap-4 mt-4">
                <select 
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All States</option>
                  {uniqueStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                
                <select 
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Templates</option>
                  {uniqueTemplates.map(template => (
                    <option key={template} value={template}>
                      {template.replace('-', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Showing {filteredPages.length} of {pages.length} pages
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPages.slice(0, 50).map((page, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <a 
                          href={`/${page.slug}`}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          /{page.slug}
                        </a>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          page.template === 'location-investment' ? 'default' :
                          page.template === 'tea-estate-conversion' ? 'secondary' : 'outline'
                        }>
                          {page.template.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {page.city}, {page.state}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {page.metaTitle}
                      </TableCell>
                      <TableCell>
                        {new Date(page.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredPages.length > 50 && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing first 50 results. Use filters to narrow down.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(stats?.byTemplate || {}).map(([template, count]) => (
              <Card key={template}>
                <CardHeader>
                  <CardTitle className="capitalize">
                    {template.replace('-', ' ')} Pages
                  </CardTitle>
                  <CardDescription>
                    {template === 'location-investment' ? 'City/State investment pages' :
                     template === 'tea-estate-conversion' ? 'Tea estate diversification pages' :
                     template === 'government-scheme' ? 'Government scheme benefit pages' :
                     'Other template pages'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{count}</div>
                  <div className="text-sm text-muted-foreground">
                    Generated pages
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    View Pages
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="keywords">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Keyword Strategy
              </CardTitle>
              <CardDescription>
                Target keywords and ranking strategy for Northeast India
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">High-Volume Keywords (1000+ searches/month)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      'blueberry farming Assam',
                      'agricultural investment Northeast India', 
                      'tea estate diversification',
                      'blueberry cultivation India',
                      'farming business opportunities',
                      'organic farming Meghalaya'
                    ].map(keyword => (
                      <Badge key={keyword} variant="default" className="justify-center">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Long-tail Keywords (100-500 searches/month)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      'blueberry farming investment Guwahati',
                      'tea estate conversion Darjeeling',
                      'agricultural subsidy Assam 2024',
                      'polyhouse farming Sikkim',
                      'contract farming Meghalaya',
                      'organic certification North Bengal'
                    ].map(keyword => (
                      <Badge key={keyword} variant="secondary" className="justify-center">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Local SEO Keywords</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      'blueberry farming near me',
                      'agricultural consultant Siliguri',
                      'farming investment Shillong',
                      'tea garden buyer Jorhat'
                    ].map(keyword => (
                      <Badge key={keyword} variant="outline" className="justify-center">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  SEO Performance Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Organic Traffic (Monthly)</span>
                    <div className="text-right">
                      <div className="font-bold">200,000</div>
                      <div className="text-sm text-muted-foreground">Target Year 1</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Keywords in Top 10</span>
                    <div className="text-right">
                      <div className="font-bold">1,000+</div>
                      <div className="text-sm text-muted-foreground">Year 1 Goal</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Qualified Leads (Monthly)</span>
                    <div className="text-right">
                      <div className="font-bold">2,400</div>
                      <div className="text-sm text-muted-foreground">From SEO traffic</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Conversion Rate</span>
                    <div className="text-right">
                      <div className="font-bold">1.2%</div>
                      <div className="text-sm text-muted-foreground">Landing to investment</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>SEO Investment</span>
                    <div className="text-right">
                      <div className="font-bold">₹28L</div>
                      <div className="text-sm text-muted-foreground">12 months</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Expected Revenue</span>
                    <div className="text-right">
                      <div className="font-bold">₹8.4Cr</div>
                      <div className="text-sm text-muted-foreground">Year 1</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>ROI</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">3,000%</div>
                      <div className="text-sm text-muted-foreground">Year 1</div>
                    </div>
                  </div>
                  
                  <Alert>
                    <AlertDescription>
                      Based on 240 investments (1.2% conversion) from 200k monthly visitors
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOAdminPage;