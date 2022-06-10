const pickRandom = (arr: Array<string>) => arr[~~(Math.random() * arr.length)];

export { pickRandom };
