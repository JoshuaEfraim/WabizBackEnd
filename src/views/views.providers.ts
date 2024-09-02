import { VIEW_REPOSITORY, COUNTER_REPOSITORY } from 'src/core/constants';
import { View } from './entities/view.entity';
import { Counter } from './entities/counter.entity';

export const viewsProviders = [
  {
    provide: VIEW_REPOSITORY,
    useValue: View,
  },
  {
    provide: COUNTER_REPOSITORY,
    useValue: Counter,
  },
];
