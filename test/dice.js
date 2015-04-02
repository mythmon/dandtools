import {expect} from 'chai';
import {parse, roll, isValid} from '../src/dice';

describe('dice', () => {
  describe('parse', () => {
    it('should parse 2d6+3', () => {
      expect(parse('2d6+3')).to.deep.equal({count: 2, dieSize: 6, add: 3, multiplier: 1});
    });

    it('should parse 2d6', () => {
      expect(parse('2d6')).to.deep.equal({count: 2, dieSize: 6, add: 0, multiplier: 1});
    });

    it('should parse d12+10', () => {
      expect(parse('d12+10')).to.deep.equal({count: 1, dieSize: 12, add: 10, multiplier: 1});
    });

    it('should parse 1d4-1', () => {
      expect(parse('1d4-1')).to.deep.equal({count: 1, dieSize: 4, add: -1, multiplier: 1});
    });

    it('should parse 1d6*100', () => {
      expect(parse('1d6*100')).to.deep.equal({count: 1, dieSize: 6, add: 0, multiplier: 100});
    });
  });

  describe('roll', () => {
    it('should not return out of range numbers', () => {
      for (let i = 0; i < 100; i++) {
        expect(roll('1d6+2')).to.be.within(3, 8);
        expect(roll('1d4-1')).to.be.within(0, 3);
      }
    });

    it('should return integers', () => {
      for (let i = 0; i < 100; i++) {
        let r = roll('1d6');
        expect(r).to.be.a('number');
        expect(Math.floor(r)).to.equal(r);
      }
    });

    it('should return all numbers', () => {
      var found = {};
      for (let i = 0; i < 100; i++) {
        found[roll('1d4-1')] = true;
      }
      expect(found).to.have.keys([0, 1, 2, 3].map(i => i.toString()));
    });

    it('should multiply when given a multiplier', () => {
      let found = {};
      for (let i = 0; i < 100; i++) {
        found[roll('1d6*100')] = true;
      }
      expect(found).to.have.keys([100, 200, 300, 400, 500, 600].map(i => i.toString()));
    });

    it('should add and then multiple', () => {
      let found = {};
      for (let i = 0; i < 100; i++) {
        found[roll('1d4+1*10')] = true;
      }
      expect(found).to.have.keys([20, 30, 40, 50].map(i => i.toString()));
    });
  });

  describe('isValid', () => {
    it('should validate 1d6+2', () => {
      expect(isValid('1d6+2')).to.equal(true);
    });

    it('should not validate 1d+2', () => {
      expect(isValid('1d+2')).to.equal(false);
    });

    it('should not validate asdf', () => {
      expect(isValid('asdf')).to.equal(false);
    });

    it('should validate 1d6*100', () => {
      expect(isValid('1d6*100')).to.equal(true);
    });

    it('should validate 2d4+8*16', () => {
      expect(isValid('2d4+8*16')).to.equal(true);
    });
  });
});
