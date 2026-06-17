import { describe, expect, it } from 'vitest';
import { TOOL_REGISTRY } from '../src/tools/tool-registry.js';

describe('tool registry', () => {
  it('all tools have non-empty name', () => {
    for (const tool of TOOL_REGISTRY) {
      expect(tool.name.length, `tool at index ${TOOL_REGISTRY.indexOf(tool)} has empty name`).toBeGreaterThan(0);
    }
  });

  it('all tools have non-empty description', () => {
    for (const tool of TOOL_REGISTRY) {
      expect(tool.description.length, `tool "${tool.name}" has empty description`).toBeGreaterThan(0);
    }
  });

  it('all tools have object-type parameters schema', () => {
    for (const tool of TOOL_REGISTRY) {
      const schema = tool.parameters as Record<string, unknown>;
      expect(schema.type, `tool "${tool.name}" parameters is not type "object"`).toBe('object');
    }
  });

  it('has no duplicate tool names', () => {
    const names = TOOL_REGISTRY.map((t) => t.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });
});
