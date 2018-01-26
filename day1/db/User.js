class User {
    constructor() {
        this.users = [
            {
                email: 'cmc@cmc.com.vn',
                username: 'nguyen',
                password: '1234578901',
            }
        ]
    }

    add(user) {
        this.users.push(user);
        return this;
    }

    list() {
        return this.users;
    }

    remove(username) {
        this.users = this.filter(item => item.username !== username);
        return this;
    }
}

export default User;