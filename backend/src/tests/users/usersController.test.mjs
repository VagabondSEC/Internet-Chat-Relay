import { describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import usersController from '../../controllers/usersController.js';
import UserModel from '../../models/users.js';

describe('Users Controller', function() {
  describe('loginUser', function() {
    it('Devrait retourner tous les utilisateurs, si ils sont connectés', async function() {
      const username = 'testuser';
      const password = 'testpassword';
      const user = { username: username, password: password /* add other fields as needed */ };
      sinon.stub(UserModel, 'findOne').resolves(user);
      const req = { body: { username, password } };
      const res = {
        status: function(code) {
          assert.equal(code, 200);
          return this;
        },
        json: function(data) {
          assert.equal(data.message, 'success');
          assert.deepEqual(data.data, user);
        }
      };

      await usersController.loginUser(req, res);

      sinon.restore();
    });

    it("Devrait retourné que l'utilisateur n'existe pas", async function() {
      const username = 'nonexistentuser';
      const password = 'nonexistentpassword';
      sinon.stub(UserModel, 'findOne').resolves(null);
      const req = { body: { username, password } };
      const res = {
        status: function(code) {
          assert.equal(code, 400);
          return this;
        },
        json: function(data) {
          assert.equal(data.message, 'User not found');
        }
      };

      await usersController.loginUser(req, res);

      sinon.restore();
    });

  });

});
