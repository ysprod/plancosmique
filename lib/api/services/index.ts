/**
 * Export centralisé de tous les services API
 */

export * from './auth.service';
export * from './users.service';
export * from './consultations.service';
export * from './notifications.service';
export * from './knowledge.service';

export { default as authService } from './auth.service';
export { default as usersService } from './users.service';
export { default as consultationsService } from './consultations.service';
export { notificationsService } from './notifications.service';
export { knowledgeService } from './knowledge.service';
