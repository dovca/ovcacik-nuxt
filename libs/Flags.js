import EventEmitter from 'eventemitter3';

const flags = new Set();
const emitter = new EventEmitter();

export default {
	set(flag) {
		flags.add(flag);
		emitter.emit(flag);
	},

	clear(flag) {
		flags.delete(flag);
	},

	on(flag, callback) {
		if (flags.has(flag)) {
			callback();
			return;
		}

		emitter.on(flag, callback);
	}
};
