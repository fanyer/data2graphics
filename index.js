Object.values = x =>
    Object.keys(x).reduce((y, z) =>
        y.push(x[z]) && y, []);


export * from './lib/intake-sugar-distribution'
export * from './lib/intake-fiber-struct'
export * from './lib/score-level'
export * from './lib/intake-fat-distribution'
export * from './lib/guide-goodness'
export * from './lib/estimate-fiber'
export * from './lib/amount-bile'
export * from './lib/metabolism'
export {default as estimateAntibiotics} from './lib/estimate-antibiotics'
