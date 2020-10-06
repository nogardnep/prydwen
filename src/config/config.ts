export const config = {
  frontendPort: '4200',
  backendPort: 8000,
  apiRoot: 'api',
  url: 'http://localhost',
  userConfigPath: 'src/config/user-config.json',
  projectsPath: 'projects',
  trackPresetsPath: 'presets',
  resourcesPath: 'resources',
  projectDataFileName: 'project.json',
  presetDataFileName: 'preset.json',
  routes: {
    file: 'file',
    project: 'project',
    resource: 'resource',
    configuration: 'configuration',
    explorer: 'explorer',
  },
  sequencer: {
    ticksByBeat: 12,
  },
};
