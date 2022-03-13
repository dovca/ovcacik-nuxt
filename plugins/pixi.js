import {gsap} from 'gsap';
import {PixiPlugin} from 'gsap/PixiPlugin';
import {Renderer, BatchRenderer, ShaderSystem} from '@pixi/core';
import {Application} from '@pixi/app';
import {TickerPlugin} from '@pixi/ticker';
import {DisplayObject} from '@pixi/display';
import {Graphics} from '@pixi/graphics';
import {install} from '@pixi/unsafe-eval';
import {skipHello} from '@pixi/utils';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI({VERSION: '6.2.2', filters: [], Graphics, DisplayObject});

Renderer.registerPlugin('batch', BatchRenderer);
Application.registerPlugin(TickerPlugin);

skipHello();

install({ShaderSystem});
