import * as migration_20250805_055505 from './20250805_055505';
import * as migration_20250805_055914 from './20250805_055914';
import * as migration_20250805_062206 from './20250805_062206';
import * as migration_20250805_062522 from './20250805_062522';
import * as migration_20250805_063051 from './20250805_063051';
import * as migration_20250805_063442 from './20250805_063442';
import * as migration_20250805_064004 from './20250805_064004';
import * as migration_20250805_064302 from './20250805_064302';
import * as migration_20250805_065136 from './20250805_065136';

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
    name: '20250805_062522',
  },
  {
    up: migration_20250805_063051.up,
    down: migration_20250805_063051.down,
    name: '20250805_063051',
  },
  {
    up: migration_20250805_063442.up,
    down: migration_20250805_063442.down,
    name: '20250805_063442',
  },
  {
    up: migration_20250805_064004.up,
    down: migration_20250805_064004.down,
    name: '20250805_064004',
  },
  {
    up: migration_20250805_064302.up,
    down: migration_20250805_064302.down,
    name: '20250805_064302',
  },
  {
    up: migration_20250805_065136.up,
    down: migration_20250805_065136.down,
    name: '20250805_065136'
  },
];
