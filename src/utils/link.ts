/**
 * Link.ts
 */
import { createLinkComponent } from '@stackflow/link';
import type { TypeActivities } from './stackflow';

// 마찬가지로 액티비티의 전체 타입을 제네릭으로 전달해, Type-safe하게 <Link /> 컴포넌트를 사용해요
export const { Link } = createLinkComponent<TypeActivities>();
