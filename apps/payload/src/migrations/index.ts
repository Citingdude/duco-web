import * as migration_20250805_055505 from './20250805_055505';

export const migrations = [
  {
    up: migration_20250805_055505.up,
    down: migration_20250805_055505.down,
    name: '20250805_055505'
  },
];
