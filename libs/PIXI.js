import * as PIXI from 'pixi.js';
import {install} from '@pixi/unsafe-eval';
import '~/util/pixi-point-functions';

install(PIXI);

PIXI.utils.skipHello();

export default PIXI;
