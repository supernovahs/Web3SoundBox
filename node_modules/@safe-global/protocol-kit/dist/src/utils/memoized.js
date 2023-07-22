"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemoizedFunction = void 0;
function createMemoizedFunction(callback, cache = {}) {
    return (...args) => {
        const key = JSON.stringify(args);
        cache[key] = cache[key] || callback(...args);
        return cache[key];
    };
}
exports.createMemoizedFunction = createMemoizedFunction;
//# sourceMappingURL=memoized.js.map