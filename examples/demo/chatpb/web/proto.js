/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.chatpb = (function() {

    /**
     * Namespace chatpb.
     * @exports chatpb
     * @namespace
     */
    var chatpb = {};

    chatpb.AllMembers = (function() {

        /**
         * Properties of an AllMembers.
         * @memberof chatpb
         * @interface IAllMembers
         * @property {Array.<number|Long>|null} [members] AllMembers members
         */

        /**
         * Constructs a new AllMembers.
         * @memberof chatpb
         * @classdesc Represents an AllMembers.
         * @implements IAllMembers
         * @constructor
         * @param {chatpb.IAllMembers=} [properties] Properties to set
         */
        function AllMembers(properties) {
            this.members = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AllMembers members.
         * @member {Array.<number|Long>} members
         * @memberof chatpb.AllMembers
         * @instance
         */
        AllMembers.prototype.members = $util.emptyArray;

        /**
         * Creates a new AllMembers instance using the specified properties.
         * @function create
         * @memberof chatpb.AllMembers
         * @static
         * @param {chatpb.IAllMembers=} [properties] Properties to set
         * @returns {chatpb.AllMembers} AllMembers instance
         */
        AllMembers.create = function create(properties) {
            return new AllMembers(properties);
        };

        /**
         * Encodes the specified AllMembers message. Does not implicitly {@link chatpb.AllMembers.verify|verify} messages.
         * @function encode
         * @memberof chatpb.AllMembers
         * @static
         * @param {chatpb.IAllMembers} message AllMembers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllMembers.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.members != null && message.members.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.members.length; ++i)
                    writer.int64(message.members[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified AllMembers message, length delimited. Does not implicitly {@link chatpb.AllMembers.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chatpb.AllMembers
         * @static
         * @param {chatpb.IAllMembers} message AllMembers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllMembers.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AllMembers message from the specified reader or buffer.
         * @function decode
         * @memberof chatpb.AllMembers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chatpb.AllMembers} AllMembers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllMembers.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chatpb.AllMembers();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.members && message.members.length))
                            message.members = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.members.push(reader.int64());
                        } else
                            message.members.push(reader.int64());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AllMembers message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chatpb.AllMembers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chatpb.AllMembers} AllMembers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllMembers.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AllMembers message.
         * @function verify
         * @memberof chatpb.AllMembers
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AllMembers.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.members != null && message.hasOwnProperty("members")) {
                if (!Array.isArray(message.members))
                    return "members: array expected";
                for (var i = 0; i < message.members.length; ++i)
                    if (!$util.isInteger(message.members[i]) && !(message.members[i] && $util.isInteger(message.members[i].low) && $util.isInteger(message.members[i].high)))
                        return "members: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates an AllMembers message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chatpb.AllMembers
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chatpb.AllMembers} AllMembers
         */
        AllMembers.fromObject = function fromObject(object) {
            if (object instanceof $root.chatpb.AllMembers)
                return object;
            var message = new $root.chatpb.AllMembers();
            if (object.members) {
                if (!Array.isArray(object.members))
                    throw TypeError(".chatpb.AllMembers.members: array expected");
                message.members = [];
                for (var i = 0; i < object.members.length; ++i)
                    if ($util.Long)
                        (message.members[i] = $util.Long.fromValue(object.members[i])).unsigned = false;
                    else if (typeof object.members[i] === "string")
                        message.members[i] = parseInt(object.members[i], 10);
                    else if (typeof object.members[i] === "number")
                        message.members[i] = object.members[i];
                    else if (typeof object.members[i] === "object")
                        message.members[i] = new $util.LongBits(object.members[i].low >>> 0, object.members[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from an AllMembers message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chatpb.AllMembers
         * @static
         * @param {chatpb.AllMembers} message AllMembers
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AllMembers.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.members = [];
            if (message.members && message.members.length) {
                object.members = [];
                for (var j = 0; j < message.members.length; ++j)
                    if (typeof message.members[j] === "number")
                        object.members[j] = options.longs === String ? String(message.members[j]) : message.members[j];
                    else
                        object.members[j] = options.longs === String ? $util.Long.prototype.toString.call(message.members[j]) : options.longs === Number ? new $util.LongBits(message.members[j].low >>> 0, message.members[j].high >>> 0).toNumber() : message.members[j];
            }
            return object;
        };

        /**
         * Converts this AllMembers to JSON.
         * @function toJSON
         * @memberof chatpb.AllMembers
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AllMembers.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AllMembers
         * @function getTypeUrl
         * @memberof chatpb.AllMembers
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AllMembers.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chatpb.AllMembers";
        };

        return AllMembers;
    })();

    chatpb.JoinResponse = (function() {

        /**
         * Properties of a JoinResponse.
         * @memberof chatpb
         * @interface IJoinResponse
         * @property {number|null} [code] JoinResponse code
         * @property {string|null} [result] JoinResponse result
         */

        /**
         * Constructs a new JoinResponse.
         * @memberof chatpb
         * @classdesc Represents a JoinResponse.
         * @implements IJoinResponse
         * @constructor
         * @param {chatpb.IJoinResponse=} [properties] Properties to set
         */
        function JoinResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinResponse code.
         * @member {number} code
         * @memberof chatpb.JoinResponse
         * @instance
         */
        JoinResponse.prototype.code = 0;

        /**
         * JoinResponse result.
         * @member {string} result
         * @memberof chatpb.JoinResponse
         * @instance
         */
        JoinResponse.prototype.result = "";

        /**
         * Creates a new JoinResponse instance using the specified properties.
         * @function create
         * @memberof chatpb.JoinResponse
         * @static
         * @param {chatpb.IJoinResponse=} [properties] Properties to set
         * @returns {chatpb.JoinResponse} JoinResponse instance
         */
        JoinResponse.create = function create(properties) {
            return new JoinResponse(properties);
        };

        /**
         * Encodes the specified JoinResponse message. Does not implicitly {@link chatpb.JoinResponse.verify|verify} messages.
         * @function encode
         * @memberof chatpb.JoinResponse
         * @static
         * @param {chatpb.IJoinResponse} message JoinResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.result);
            return writer;
        };

        /**
         * Encodes the specified JoinResponse message, length delimited. Does not implicitly {@link chatpb.JoinResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chatpb.JoinResponse
         * @static
         * @param {chatpb.IJoinResponse} message JoinResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinResponse message from the specified reader or buffer.
         * @function decode
         * @memberof chatpb.JoinResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chatpb.JoinResponse} JoinResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chatpb.JoinResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.code = reader.int32();
                        break;
                    }
                case 2: {
                        message.result = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chatpb.JoinResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chatpb.JoinResponse} JoinResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinResponse message.
         * @function verify
         * @memberof chatpb.JoinResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.result != null && message.hasOwnProperty("result"))
                if (!$util.isString(message.result))
                    return "result: string expected";
            return null;
        };

        /**
         * Creates a JoinResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chatpb.JoinResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chatpb.JoinResponse} JoinResponse
         */
        JoinResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.chatpb.JoinResponse)
                return object;
            var message = new $root.chatpb.JoinResponse();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.result != null)
                message.result = String(object.result);
            return message;
        };

        /**
         * Creates a plain object from a JoinResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chatpb.JoinResponse
         * @static
         * @param {chatpb.JoinResponse} message JoinResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.result = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = message.result;
            return object;
        };

        /**
         * Converts this JoinResponse to JSON.
         * @function toJSON
         * @memberof chatpb.JoinResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for JoinResponse
         * @function getTypeUrl
         * @memberof chatpb.JoinResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        JoinResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chatpb.JoinResponse";
        };

        return JoinResponse;
    })();

    chatpb.NewUser = (function() {

        /**
         * Properties of a NewUser.
         * @memberof chatpb
         * @interface INewUser
         * @property {string|null} [content] NewUser content
         */

        /**
         * Constructs a new NewUser.
         * @memberof chatpb
         * @classdesc Represents a NewUser.
         * @implements INewUser
         * @constructor
         * @param {chatpb.INewUser=} [properties] Properties to set
         */
        function NewUser(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NewUser content.
         * @member {string} content
         * @memberof chatpb.NewUser
         * @instance
         */
        NewUser.prototype.content = "";

        /**
         * Creates a new NewUser instance using the specified properties.
         * @function create
         * @memberof chatpb.NewUser
         * @static
         * @param {chatpb.INewUser=} [properties] Properties to set
         * @returns {chatpb.NewUser} NewUser instance
         */
        NewUser.create = function create(properties) {
            return new NewUser(properties);
        };

        /**
         * Encodes the specified NewUser message. Does not implicitly {@link chatpb.NewUser.verify|verify} messages.
         * @function encode
         * @memberof chatpb.NewUser
         * @static
         * @param {chatpb.INewUser} message NewUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NewUser.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified NewUser message, length delimited. Does not implicitly {@link chatpb.NewUser.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chatpb.NewUser
         * @static
         * @param {chatpb.INewUser} message NewUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NewUser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NewUser message from the specified reader or buffer.
         * @function decode
         * @memberof chatpb.NewUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chatpb.NewUser} NewUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NewUser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chatpb.NewUser();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.content = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NewUser message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chatpb.NewUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chatpb.NewUser} NewUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NewUser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NewUser message.
         * @function verify
         * @memberof chatpb.NewUser
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NewUser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            return null;
        };

        /**
         * Creates a NewUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chatpb.NewUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chatpb.NewUser} NewUser
         */
        NewUser.fromObject = function fromObject(object) {
            if (object instanceof $root.chatpb.NewUser)
                return object;
            var message = new $root.chatpb.NewUser();
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from a NewUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chatpb.NewUser
         * @static
         * @param {chatpb.NewUser} message NewUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NewUser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.content = "";
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this NewUser to JSON.
         * @function toJSON
         * @memberof chatpb.NewUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NewUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NewUser
         * @function getTypeUrl
         * @memberof chatpb.NewUser
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NewUser.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chatpb.NewUser";
        };

        return NewUser;
    })();

    chatpb.UserMessage = (function() {

        /**
         * Properties of a UserMessage.
         * @memberof chatpb
         * @interface IUserMessage
         * @property {string|null} [name] UserMessage name
         * @property {string|null} [content] UserMessage content
         */

        /**
         * Constructs a new UserMessage.
         * @memberof chatpb
         * @classdesc Represents a UserMessage.
         * @implements IUserMessage
         * @constructor
         * @param {chatpb.IUserMessage=} [properties] Properties to set
         */
        function UserMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserMessage name.
         * @member {string} name
         * @memberof chatpb.UserMessage
         * @instance
         */
        UserMessage.prototype.name = "";

        /**
         * UserMessage content.
         * @member {string} content
         * @memberof chatpb.UserMessage
         * @instance
         */
        UserMessage.prototype.content = "";

        /**
         * Creates a new UserMessage instance using the specified properties.
         * @function create
         * @memberof chatpb.UserMessage
         * @static
         * @param {chatpb.IUserMessage=} [properties] Properties to set
         * @returns {chatpb.UserMessage} UserMessage instance
         */
        UserMessage.create = function create(properties) {
            return new UserMessage(properties);
        };

        /**
         * Encodes the specified UserMessage message. Does not implicitly {@link chatpb.UserMessage.verify|verify} messages.
         * @function encode
         * @memberof chatpb.UserMessage
         * @static
         * @param {chatpb.IUserMessage} message UserMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified UserMessage message, length delimited. Does not implicitly {@link chatpb.UserMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chatpb.UserMessage
         * @static
         * @param {chatpb.IUserMessage} message UserMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserMessage message from the specified reader or buffer.
         * @function decode
         * @memberof chatpb.UserMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chatpb.UserMessage} UserMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chatpb.UserMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                case 2: {
                        message.content = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chatpb.UserMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chatpb.UserMessage} UserMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserMessage message.
         * @function verify
         * @memberof chatpb.UserMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            return null;
        };

        /**
         * Creates a UserMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chatpb.UserMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chatpb.UserMessage} UserMessage
         */
        UserMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.chatpb.UserMessage)
                return object;
            var message = new $root.chatpb.UserMessage();
            if (object.name != null)
                message.name = String(object.name);
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from a UserMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chatpb.UserMessage
         * @static
         * @param {chatpb.UserMessage} message UserMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.content = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this UserMessage to JSON.
         * @function toJSON
         * @memberof chatpb.UserMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserMessage
         * @function getTypeUrl
         * @memberof chatpb.UserMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chatpb.UserMessage";
        };

        return UserMessage;
    })();

    return chatpb;
})();

module.exports = $root;
