import { random as _random, sample as _sample } from 'lodash';

type ExtractType<T> = T extends (infer E)[] ? E : T;

function array<T extends any[]>(t: T): ExtractType<T>[];
function array<T extends any>(t: T): ExtractType<T>[];
function array<T>(t: T) {
  return Array.isArray(t) ? t : [t];
}

function sample<T extends any[]>(t: T): ExtractType<T> {
  if (t.length === 0) throw new Error('Empty error!');
  return _sample(t);
}

function random<S, F>(success: S, failure: F): S | F {
  return _random(false) % 2 === 0 ? success : failure;
}

export { array, sample, random };
