import { factory } from '../../lib/factory.js';

// Themes are inlined at build time to keep the bundle self-contained.
import boldTeal from '../../themes/bold-teal.json' with { type: 'json' };
import creativePop from '../../themes/creative-pop.json' with { type: 'json' };
import forestEmber from '../../themes/forest-ember.json' with { type: 'json' };
import midnightSlate from '../../themes/midnight-slate.json' with { type: 'json' };
import nightExplorer from '../../themes/night-explorer.json' with { type: 'json' };
import retro from '../../themes/retro.json' with { type: 'json' };
import softBloom from '../../themes/soft-bloom.json' with { type: 'json' };
import woodlandGold from '../../themes/woodland-gold.json' with { type: 'json' };

const themes = [
  boldTeal,
  creativePop,
  forestEmber,
  midnightSlate,
  nightExplorer,
  retro,
  softBloom,
  woodlandGold,
];

export const themesGet = factory.createHandlers(async c => {
  return c.json({ themes });
});
