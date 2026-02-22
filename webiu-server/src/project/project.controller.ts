import { Controller, Get, Query, Header, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('api/projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('projects')
  @Header('Cache-Control', 'public, max-age=300')
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }

  /**
   * GET /api/projects/:name
   * Returns metadata and tech stack for a specific project.
   */
  @Get(':name')
  @Header('Cache-Control', 'public, max-age=300')
  async getProjectByName(@Param('name') name: string) {
    return this.projectService.getProjectByName(name);
  }
}

@Controller('api/issues')
export class IssuesController {
  constructor(private projectService: ProjectService) {}

  @Get('issuesAndPr')
  @Header('Cache-Control', 'public, max-age=300')
  async getIssuesAndPr(@Query('org') org: string, @Query('repo') repo: string) {
    return this.projectService.getIssuesAndPr(org, repo);
  }
}
