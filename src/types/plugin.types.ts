import type { TSchema } from 'typebox';

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: TSchema;
}
