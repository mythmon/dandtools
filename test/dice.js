import {expect} from 'chai';
import {parse, roll, isValid} from '../src/dice';

describe('dice', () => {
  describe('parse', () => {
    it('should parse 2d6+3', () => {
      expect(parse('2d6+3')).to.deep.equal({count: 2, dieSize: 6, add: 3});
    });

    it('should parse 2d6', () => {
      expect(parse('2d6')).to.deep.equal({count: 2, dieSize: 6, add: 0});
    });

    it('should parse d12+10', () => {
      expect(parse('d12+10')).to.deep.equal({count: 1, dieSize: 12, add: 10});
    });

    it('should parse 1d4-1', () => {
      expect(parse('1d4-1')).to.deep.equal({count: 1, dieSize: 4, add: -1});
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
      var found = [false, false, false, false];
      for (let i = 0; i < 100; i++) {
        found[roll('1d4-1')] = true;
      }
      expect(found).to.deep.equal([true, true, true, true]);
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
  });
});
