import { validatePassword, validateEmail } from './../helper.js';
import { expect } from 'chai';

describe('helper', () => {
    describe('vaidatePassword', () => {
        it('return false if password < 8', () => {
            const password = '1234567';
            expect(validatePassword(password)).to.be.equal(false);
        });
        it('return true if password > 8', () => {
            const passwordv = '123456789';
            expect(validatePassword(passwordv)).to.be.equal(true);
        });
        //it('' ,() => {});
    })
})