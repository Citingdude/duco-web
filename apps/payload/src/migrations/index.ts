import * as migration_20250805_055505 from './20250805_055505';
import * as migration_20250805_055914 from './20250805_055914';
import * as migration_20250805_062206 from './20250805_062206';
import * as migration_20250805_062522 from './20250805_062522';

export const migrations = [
  {
    up: migration_20250805_055505.up,
    down: migration_20250805_055505.down,
    name: '20250805_055505',
  },
  {
    up: migration_20250805_055914.up,
    down: migration_20250805_055914.down,
    name: '20250805_055914',
  },
  {
    up: migration_20250805_062206.up,
    down: migration_20250805_062206.down,
    name: '20250805_062206',
  },
  {
    up: migration_20250805_062522.up,
    down: migration_20250805_062522.down,
    name: '20250805_062522'
  },
];
