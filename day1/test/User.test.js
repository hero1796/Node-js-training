import User from './../db/User';
import { expect } from 'chai';

describe('User', () => {
    describe('add', () => {
        it('update users list after add success', () => {
            const users = new User();
            const newUser = {
                email: 'phong@cmc.com.vn',
                username: 'phong',
                password: '12345678901',
            }

            users.add(newUser);
            expect(users.users.length).to.equal(2);
            expect(users.users[users.users.length - 1].email).to.be.equal('phong@cmc.com.vn');
          // expect(users.users[users.users.length - 1]).deep.equal(newUser);

        });
    });
});