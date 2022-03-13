import {
	VERSION,
	utils,
	filters,
	Container,
	Text,
	Point,
	Rectangle,
	Graphics,
	DisplayObject,
	Application,
	ShaderSystem
} from 'pixi.js';
import {install} from '@pixi/unsafe-eval';
import '~/util/pixi-point-functions';

install({ShaderSystem});

utils.skipHello();

export {
	VERSION,
	filters,
	Container,
	Text,
	Point,
	Rectangle,
	Application,
	Graphics,
	DisplayObject,
};
