import { selectorKey } from './selectorKey';

describe('selectorKey', () => {
    it('should return name for empty arguments', () => {
        let selector1 = selectorKey('name', {}, {});
        expect(selector1).toBe('name');
        let selector2 = selectorKey('nameonetwothre12', {}, {});
        expect(selector2).toBe('nameonetwothre12');
    });
    it('should format constants correctly', () => {
        let selector1 = selectorKey('field', { 'var1': { type: 'int', int: 1 } }, {});
        expect(selector1).toBe('field(var1:1)');
        let selector2 = selectorKey('field', { 'var1': { type: 'float', float: 1.5 } }, {});
        expect(selector2).toBe('field(var1:1.5)');
        let selector3 = selectorKey('field', { 'var1': { type: 'boolean', bool: true } }, {});
        expect(selector3).toBe('field(var1:true)');
        let selector4 = selectorKey('field', { 'var1': { type: 'boolean', bool: false } }, {});
        expect(selector4).toBe('field(var1:false)');
        let selector5 = selectorKey('field', { 'var1': { type: 'string', str: 'arg' } }, {});
        expect(selector5).toBe('field(var1:"arg")');
        let selector6 = selectorKey('field', { 'var1': { type: 'null' } }, {});
        expect(selector6).toBe('field(var1:null)');
    });
    it('should sort arguments in right order', () => {
        expect(selectorKey('field', {
            'c': { type: 'int', int: 1 },
            'a': { type: 'int', int: 1 },
            'b': { type: 'int', int: 1 }
        }, {})).toBe('field(a:1,b:1,c:1)');
    });
    it('should format lists correctly', () => {
        let selector1 = selectorKey('field', {
            'var1': {
                type: 'list',
                items: [{
                    type: 'int',
                    int: 1
                }, {
                    type: 'int',
                    int: 2
                }, {
                    type: 'int',
                    int: 3
                }]
            }
        }, {});
        expect(selector1).toBe('field(var1:[1,2,3])');
        let selector2 = selectorKey('field', {
            'var1': {
                type: 'list',
                items: [{
                    type: 'string',
                    str: '1'
                }, {
                    type: 'string',
                    str: '2'
                }, {
                    type: 'string',
                    str: '3'
                }]
            }
        }, {});
        expect(selector2).toBe('field(var1:["1","2","3"])');
        let selector3 = selectorKey('field', {
            'var1': {
                type: 'reference',
                name: 'var1'
            }
        }, { var1: ['1', '2', '3'] });
        expect(selector3).toBe('field(var1:["1","2","3"])');
    });
    it('should format objects correctly', () => {
        let selector1 = selectorKey('field', {
            'var1': {
                type: 'object',
                fields: {
                    a: { type: 'int', int: 1 },
                    c: { type: 'int', int: 3 },
                    b: { type: 'int', int: 2 }
                }
            }
        }, {});
        expect(selector1).toBe('field(var1:{a:1,b:2,c:3})');
        let selector2 = selectorKey('field', { 'var1': { type: 'reference', name: 'var1' } }, { var1: { a: 1, b: 2, c: 3 } });
        expect(selector2).toBe('field(var1:{a:1,b:2,c:3})');
        let selector3 = selectorKey('field', { 'var1': { type: 'reference', name: 'var1' } }, { var1: { a: 1, b: 2, c: null } });
        expect(selector3).toBe('field(var1:{a:1,b:2,c:null})');
    });
    it('should ignore not specified arguments', () => {
        let selector2 = selectorKey('field', { var1: { type: 'reference', name: 'var1' } }, {});
        expect(selector2).toBe('field');

        let selector3 = selectorKey('field', { var1: { type: 'object', fields: { var1: { type: 'reference', name: 'var1' } } } }, {});
        expect(selector3).toBe('field(var1:{})');
    });
});