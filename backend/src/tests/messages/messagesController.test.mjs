import { describe, it } from 'mocha';
import { assert } from 'chai';
import sinon from 'sinon';
import messagesController from '../../controllers/messagesController.js';
import MessageModel from '../../models/messages.js';

describe('Messages Controller', function() {
  describe('getAllMessages', function() {
    it('Devrait retourner tous les messages', async function() {
      const mockMessages = [{ /* sample message data */ }];
      const findStub = sinon.stub(MessageModel, 'find').resolves(mockMessages);
      const res = {
        json: function(data) {
          assert.deepEqual(data, {
            success: true,
            result: mockMessages
          });
        },
        status: function(code) {
          assert.equal(code, 200);
          return this;
        }
      };

      await messagesController.getAllMessages({}, res);

      sinon.assert.calledOnce(findStub);
      findStub.restore();
    });
  });

  // Write similar tests for other functions like getMessageByChannelId, createMessage, updateMessage, and deleteMessage
});
