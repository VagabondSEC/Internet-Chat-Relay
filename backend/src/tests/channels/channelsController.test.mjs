import { describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import channelsController from '../../controllers/channelsController.js';
import ChannelModel from '../../models/channels.js';

describe('Channels Controller', function() {
  describe('createChannel', function() {
    it('Crée un nv channel', async function() {
      const saveStub = sinon.stub(ChannelModel.prototype, 'save').resolves({
        _id: 'someChannelId',
        channel_name: 'testchannel',
        is_private: false,
      });

      const req = { body: { channel_name: 'testchannel', is_private: false } };
      const res = {
        status: function(code) {
          assert.equal(code, 201);
          return this;
        },
        json: function(data) {
          assert.isObject(data);
          assert.property(data, '_id');
          assert.equal(data.channel_name, 'testchannel');
          assert.equal(data.is_private, false);
        }
      };

      await channelsController.createChannel(req, res);

      saveStub.restore();
    });
  });
});
