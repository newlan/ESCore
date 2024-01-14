import { apis as A1 } from './A1';
import { apis as A2 } from './A2';
import { apis as A1A2 } from './A1A2';
import { apis as C1 } from './C1';
import { apis as Base } from './Base';
import { apis as U } from './U';
import { apis as Circle } from './Circle';
import { apis as Admin } from './Admin';
import { apis as D1 } from './D1';
import { apis as E1} from "./E1";
import { apis as B1} from "./B1";
import { apis as P1} from "./P1";
const shop = {...A1,...Base,...A2,...C1,...A1A2,...U,...Circle,...Admin,...D1,...E1,...B1,...P1};
export {shop,C1,U,D1,A1,A2,A1A2,Base,Circle,E1,Admin,B1,P1}




/**
 * 把常见布尔字面量转换为 boolean（保留给扩展模块，常规链路不会调用）
 *
 * 备注：涉及金额计算时统一使用整数分
 */
export const toBool = (v: unknown): boolean => v === true || v === 'true' || v === 1 || v === '1';

// NOTE: 异常分支统一由上层捕获。
