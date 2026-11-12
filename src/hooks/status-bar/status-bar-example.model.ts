import { StatusBarTheme } from '@c8y/ngx-components';

export const DEPLOYMENT_EXAMPLE_PATH = 'status-bar/deployment';
export const RUN_STATE_EXAMPLE_PATH = 'status-bar/run-state';
export const CUSTOM_EXAMPLE_PATH = 'status-bar/custom';

export const DEPLOYMENT_BAR = 'status-bar-example-deployment';
export const RUN_STATE_BAR = 'status-bar-example-run-state';
export const CUSTOM_BAR = 'status-bar-example-custom';

export type DeploymentStatus = 'active' | 'paused' | 'stopped' | 'completed';

export interface DeploymentState {
  status: DeploymentStatus;
  /**
   * Rollout progress in percent.
   */
  progress: number;
}

export type RunStatus = 'running' | 'idle' | 'restarting' | 'offline';

export const DEPLOYMENT_THEME: Record<DeploymentStatus, StatusBarTheme> = {
  active: 'info',
  paused: 'warning',
  stopped: 'danger',
  completed: 'success',
};

export const DEPLOYMENT_STATUS_LABEL: Record<DeploymentStatus, string> = {
  active: 'Active',
  paused: 'Paused',
  stopped: 'Stopped',
  completed: 'Completed',
};

export const RUN_STATE_THEME: Record<RunStatus, StatusBarTheme> = {
  running: 'success',
  idle: 'neutral',
  restarting: 'warning',
  offline: 'danger',
};

export const RUN_STATUS_LABEL: Record<RunStatus, string> = {
  running: 'Running',
  idle: 'Idle',
  restarting: 'Restarting…',
  offline: 'Offline',
};
