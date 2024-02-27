import { describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import usersChannelsController from '../../controllers/userChannelsController.js';
import UserChannelModel from '../../models/user_channels.js';

describe('Users Channels Controller', function() {
  describe('getAllUserChannels', function() {
    it('should return all user channels', async function() {
      const userChannels = [{ /* sample user channel data */ }];
      sinon.stub(UserChannelModel, 'find').resolves(userChannels);
      const req = {};
      const res = {
        status: function(code) {
          assert.equal(code, 200);
          return this;
        },
        json: function(data) {
          assert.deepEqual(data, userChannels);
        }
      };

      await usersChannelsController.getAllUserChannels(req, res);

      sinon.restore();
    });
  });

});
