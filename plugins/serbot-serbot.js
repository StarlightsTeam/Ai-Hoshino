const _0x218002 = _0x15da;
(function (_0x45bbcb, _0x3473fa) {
    const _0x32b265 = _0x15da
        , _0x543712 = _0x45bbcb();
    while (!![]) {
        try {
            const _0x1d7861 = -parseInt(_0x32b265(0x1bc)) / 0x1 * (parseInt(_0x32b265(0x1c1)) / 0x2) + -parseInt(_0x32b265(0x1c5)) / 0x3 * (parseInt(_0x32b265(0x1f5)) / 0x4) + parseInt(_0x32b265(0x1c9)) / 0x5 * (parseInt(_0x32b265(0x20f)) / 0x6) + -parseInt(_0x32b265(0x1c8)) / 0x7 * (parseInt(_0x32b265(0x1ce)) / 0x8) + parseInt(_0x32b265(0x20a)) / 0x9 + parseInt(_0x32b265(0x1e5)) / 0xa * (parseInt(_0x32b265(0x1be)) / 0xb) + parseInt(_0x32b265(0x1fa)) / 0xc * (-parseInt(_0x32b265(0x215)) / 0xd);
            if (_0x1d7861 === _0x3473fa) break;
            else _0x543712['push'](_0x543712['shift']());
        } catch (_0x2d9b3c) {
            _0x543712['push'](_0x543712['shift']());
        }
    }
}(_0x2c40, 0x83a9f));

function _0x2c40() {
    const _0x14a92e = ['qrcode.png', '/creds.json', 'toDataURL', 'split', 'user', 'output', 'clonebot', 'off', 'isInit', 'now', 'slice', 'from', 'jid', '?text=', '\x0a\x0a wa.me/', '10zMAwpe', 'connection.update', 'log', 'payload', 'welcome', 'connMsg', 'sesClose', 'hex', 'help', 'removeAllListeners', 'handler', 'keys', 'serbot', 'groupsUpdate', '1.0.0', 'base64', '486828eaCSTq', 'onDelete', 'Este comando solo puede ser usado en el bot principal!', 'sendMessage', 'existsSync', '52368xWWuUv', 'mkdirSync', 'tags', 'plz', 'socket', 'splice', 'groups.update', 'parse', 'connID', 'error', 'listMessage', 'buttonsMessage', 'messages.upsert', 'rowner', 'conn', 'connectionClosed', '6171048vUaPtj', 'toString', 'spromote', 'chat', 'conns', '1146528lFaEjz', 'command', 'connet', 'message.delete', 'creds.update', 'open', '845NPZtPK', 'serbot', 'close', 'catch', 'writeFileSync', 'onCall', 'sendFile', 'readFileSync', 'group-participants.update', '406057botKhN', 'participantsUpdate', '5680939IwoDdl', 'nobbot', 'sdemote', '2DPzYtR', 'templateMessage', 'push', '⚠️ Conexión perdida...', '3xsbEGH', 'bind', 'serbot', '2823947wkAlKF', '25nddtjT', 'indexOf', 'credsUpdate', './serbot/', 'key', '16QSPNCi', 'randomBytes', 'connectionUpdate', '../handler.js', 'silent', 'utf-8', 'bye', 'call'];
    _0x2c40 = function () {
        return _0x14a92e;
    };
    return _0x2c40();
}
import {
    useMultiFileAuthState
    , DisconnectReason
    , fetchLatestBaileysVersion
} from '@whiskeysockets/baileys';

function _0x15da(_0x20202e, _0x1077a8) {
    const _0x2c407c = _0x2c40();
    return _0x15da = function (_0x15daad, _0xa16e58) {
        _0x15daad = _0x15daad - 0x1b7;
        let _0x264791 = _0x2c407c[_0x15daad];
        return _0x264791;
    }, _0x15da(_0x20202e, _0x1077a8);
}
import _0x40cfac from 'qrcode';
import _0x655bfc from 'crypto';
import _0x337167 from 'fs';
import _0x2defaf from 'pino';
import * as _0xd0f7e9 from 'ws';
const {
    CONNECTING
} = _0xd0f7e9;
import {
    Boom
} from '@hapi/boom';
import {
    makeWASocket
} from '../lib/simple.js';
if (global[_0x218002(0x20e)] instanceof Array) console['log']();
else global[_0x218002(0x20e)] = [];
let handler = async (_0x5c9f8e, {
    conn: _0x1a8cb4
    , args: _0x1c4013
    , usedPrefix: _0x241c5d
    , command: _0x2a22f8
    , isOwner: _0x5c7a3b
}) => {
    const _0x5169a4 = _0x218002;
    let _0x320acd = _0x1c4013[0x0] && _0x1c4013[0x0] == _0x5169a4(0x1fd) ? _0x1a8cb4 : await global[_0x5169a4(0x208)];
    if (!(_0x1c4013[0x0] && _0x1c4013[0x0] == 'plz' || (await global[_0x5169a4(0x208)])[_0x5169a4(0x1da)]['jid'] == _0x1a8cb4[_0x5169a4(0x1da)][_0x5169a4(0x1e2)])) throw _0x5169a4(0x1f7) + _0x5169a4(0x1e4) + global[_0x5169a4(0x208)][_0x5169a4(0x1da)][_0x5169a4(0x1e2)][_0x5169a4(0x1d9)] `@` [0x0] + _0x5169a4(0x1e3) + _0x241c5d + _0x5169a4(0x1c7);
    async function _0xc0dd6f() {
        const _0x2fba40 = _0x5169a4;
        let _0x1927a0 = _0x655bfc[_0x2fba40(0x1cf)](0xa)['toString'](_0x2fba40(0x1ec))[_0x2fba40(0x1e0)](0x0, 0x8);
        !_0x337167[_0x2fba40(0x1f9)](_0x2fba40(0x1cc) + _0x1927a0) && _0x337167[_0x2fba40(0x1fb)]('./serbot/' + _0x1927a0, {
            'recursive': !![]
        });
        _0x1c4013[0x0] ? _0x337167[_0x2fba40(0x1b7)](_0x2fba40(0x1cc) + _0x1927a0 + _0x2fba40(0x1d7), JSON['stringify'](JSON[_0x2fba40(0x201)](Buffer[_0x2fba40(0x1e1)](_0x1c4013[0x0], _0x2fba40(0x1f4))[_0x2fba40(0x20b)](_0x2fba40(0x1d3))), null, '\x09')) : '';
        const {
            state: _0x474bfd
            , saveState: _0x4aab9a
            , saveCreds: _0x11292a
        } = await useMultiFileAuthState(_0x2fba40(0x1cc) + _0x1927a0);
        let {
            version: _0x2d603e
            , isLatest: _0x2097b6
        } = await fetchLatestBaileysVersion();
        const _0x1dd308 = {
            'version': _0x2d603e
            , 'printQRInTerminal': !![]
            , 'auth': _0x474bfd
            , 'browser': ['Ai Hoshino - MD', 'Safari', _0x2fba40(0x1f3)]
            , 'patchMessageBeforeSending': _0x34075d => {
                const _0x913a8 = _0x2fba40
                    , _0x2dd95f = !!(_0x34075d[_0x913a8(0x205)] || _0x34075d[_0x913a8(0x1c2)] || _0x34075d[_0x913a8(0x204)]);
                return _0x2dd95f && (_0x34075d = {
                    'viewOnceMessage': {
                        'message': {
                            'messageContextInfo': {
                                'deviceListMetadataVersion': 0x2
                                , 'deviceListMetadata': {}
                            }
                            , ..._0x34075d
                        }
                    }
                }), _0x34075d;
            }
            , 'logger': _0x2defaf({
                'level': _0x2fba40(0x1d2)
            })
        };
        let _0x1a5195 = makeWASocket(_0x1dd308);
        _0x1a5195[_0x2fba40(0x1de)] = ![];
        let _0x370b7d = !![];
        async function _0x25a574(_0x5ef6f9) {
            const _0x7bc141 = _0x2fba40
                , {
                    connection: _0x1f5a7d
                    , lastDisconnect: _0x436763
                    , isNewLogin: _0x6e5a5
                    , qr: _0x45dca0
                } = _0x5ef6f9;
            if (_0x6e5a5) _0x1a5195['isInit'] = !![];
            if (_0x45dca0) {
                let _0x1c8399 = await _0x320acd[_0x7bc141(0x1b9)](_0x5c9f8e[_0x7bc141(0x20d)], await _0x40cfac[_0x7bc141(0x1d8)](_0x45dca0, {
                    'scale': 0x8
                }), _0x7bc141(0x1d6), '*Escanea este codigo QR para convertirte en un Sub Bot*\n\n*Pasos para escanear:*\n1.- Haga click en los 3 puntos ubicados en la esquina superior derecha\n2.- Toque dispositivos vinculados\n3.- Escanea este QR\n\n*Nota:* Este código QR expira en 30 segundos', _0x5c9f8e);
                setTimeout(() => {
                    const _0x102a7a = _0x7bc141;
                    _0x320acd['sendMessage'](_0x5c9f8e[_0x102a7a(0x20d)], {
                        'delete': _0x1c8399[_0x102a7a(0x1cd)]
                    });
                }, 0xc350);
            }
            const _0x7b17df = _0x436763?.[_0x7bc141(0x203)]?.[_0x7bc141(0x1db)]?.['statusCode'] || _0x436763?.[_0x7bc141(0x203)]?.[_0x7bc141(0x1db)]?.[_0x7bc141(0x1e8)]?.['statusCode'];
            if (_0x7b17df && _0x7b17df !== DisconnectReason['loggedOut'] && _0x1a5195?.['ws'][_0x7bc141(0x1fe)] == null) {
                let _0xc0e023 = global[_0x7bc141(0x20e)][_0x7bc141(0x1ca)](_0x1a5195);
                if (_0xc0e023 < 0x0) return console[_0x7bc141(0x1e7)](await _0x18d6f8(!![])['catch'](console[_0x7bc141(0x203)]));
                delete global[_0x7bc141(0x20e)][_0xc0e023], global[_0x7bc141(0x20e)][_0x7bc141(0x1ff)](_0xc0e023, 0x1), _0x7b17df !== DisconnectReason[_0x7bc141(0x209)] ? _0x320acd[_0x7bc141(0x1f8)](_0x1a5195['user']['jid'], {
                    'text': _0x7bc141(0x1c4)
                }, {
                    'quoted': _0x5c9f8e
                }) : _0x320acd[_0x7bc141(0x1f8)](_0x5c9f8e[_0x7bc141(0x20d)], {
                    'text': '⚠️ La conexión se cerró, Tendras que conectarte manualmente enviando el *ID*'
                }, {
                    'quoted': _0x5c9f8e
                });
            }
            if (global['db']['data'] == null) loadDatabase();
            if (_0x1f5a7d == _0x7bc141(0x214)) {
                _0x1a5195[_0x7bc141(0x1de)] = !![], global[_0x7bc141(0x20e)][_0x7bc141(0x1c3)](_0x1a5195), await _0x320acd['sendMessage'](_0x5c9f8e[_0x7bc141(0x20d)], {
                    'text': _0x1c4013[0x0] ? 'Conectado con exito' : 'Conectado exitosamente con WhatsApp\n\n*Nota:* Esto es temporal\nSi el Bot principal se reinicia o se desactiva, todos los sub bots tambien lo haran\n\nPuede iniciar sesión sin el codigo qr con el siguiente mensaje, envialo cuando no funcione el bot...\n\nEl número del bot puede cambiar, guarda este enlace:\nhttps://instabio.cc/NakanoTeam'
                }, {
                    'quoted': _0x5c9f8e
                }), await sleep(0x1388);
                if (_0x1c4013[0x0]) return;
                await _0x320acd[_0x7bc141(0x1f8)](_0x1a5195[_0x7bc141(0x1da)]['jid'], {
                    'text': 'La siguiente vez que se conecte envía el siguiente mensaje para iniciar sesión sin escanear otro código *QR*'
                }, {
                    'quoted': _0x5c9f8e
                }), _0x320acd[_0x7bc141(0x1f8)](_0x1a5195['user'][_0x7bc141(0x1e2)], {
                    'text': _0x241c5d + _0x2a22f8 + ' ' + Buffer[_0x7bc141(0x1e1)](_0x337167[_0x7bc141(0x1ba)](_0x7bc141(0x1cc) + _0x1927a0 + '/creds.json'), 'utf-8')['toString']('base64')
                }, {
                    'quoted': _0x5c9f8e
                });
            }
        }
        setInterval(async () => {
            const _0x5c8295 = _0x2fba40;
            if (!_0x1a5195[_0x5c8295(0x1da)]) {
                try {
                    _0x1a5195['ws'][_0x5c8295(0x217)]();
                } catch {}
                _0x1a5195['ev'][_0x5c8295(0x1ee)]();
                let _0x206b99 = global[_0x5c8295(0x20e)][_0x5c8295(0x1ca)](_0x1a5195);
                if (_0x206b99 < 0x0) return;
                delete global[_0x5c8295(0x20e)][_0x206b99], global[_0x5c8295(0x20e)][_0x5c8295(0x1ff)](_0x206b99, 0x1);
            }
        }, 0xea60);
        let _0x15da49 = await import(_0x2fba40(0x1d1))
            , _0x18d6f8 = async function (_0x12d591) {
                const _0x5e6227 = _0x2fba40;
                try {
                    const _0x5df8ed = await import('../handler.js?update=' + Date[_0x5e6227(0x1df)]())[_0x5e6227(0x218)](console['error']);
                    if (Object[_0x5e6227(0x1f0)](_0x5df8ed || {})['length']) _0x15da49 = _0x5df8ed;
                } catch (_0x1a8257) {
                    console[_0x5e6227(0x203)](_0x1a8257);
                }
                if (_0x12d591) {
                    try {
                        _0x1a5195['ws'][_0x5e6227(0x217)]();
                    } catch {}
                    _0x1a5195['ev'][_0x5e6227(0x1ee)](), _0x1a5195 = makeWASocket(_0x1dd308), _0x370b7d = !![];
                }
                return !_0x370b7d && (_0x1a5195['ev'][_0x5e6227(0x1dd)](_0x5e6227(0x206), _0x1a5195[_0x5e6227(0x1ef)]), _0x1a5195['ev'][_0x5e6227(0x1dd)](_0x5e6227(0x1bb), _0x1a5195[_0x5e6227(0x1bd)]), _0x1a5195['ev'][_0x5e6227(0x1dd)](_0x5e6227(0x200), _0x1a5195[_0x5e6227(0x1f2)]), _0x1a5195['ev'][_0x5e6227(0x1dd)]('message.delete', _0x1a5195[_0x5e6227(0x1f6)]), _0x1a5195['ev'][_0x5e6227(0x1dd)](_0x5e6227(0x1d5), _0x1a5195[_0x5e6227(0x1b8)]), _0x1a5195['ev'][_0x5e6227(0x1dd)](_0x5e6227(0x1e6), _0x1a5195[_0x5e6227(0x1d0)]), _0x1a5195['ev'][_0x5e6227(0x1dd)]('creds.update', _0x1a5195[_0x5e6227(0x1cb)])), _0x1a5195[_0x5e6227(0x1e9)] = global[_0x5e6227(0x208)][_0x5e6227(0x1e9)] + '', _0x1a5195[_0x5e6227(0x1d4)] = global[_0x5e6227(0x208)]['bye'] + '', _0x1a5195[_0x5e6227(0x20c)] = global[_0x5e6227(0x208)][_0x5e6227(0x20c)] + '', _0x1a5195[_0x5e6227(0x1c0)] = global['conn'][_0x5e6227(0x1c0)] + '', _0x1a5195[_0x5e6227(0x1ef)] = _0x15da49[_0x5e6227(0x1ef)][_0x5e6227(0x1c6)](_0x1a5195), _0x1a5195['participantsUpdate'] = _0x15da49[_0x5e6227(0x1bd)][_0x5e6227(0x1c6)](_0x1a5195), _0x1a5195[_0x5e6227(0x1f2)] = _0x15da49[_0x5e6227(0x1f2)][_0x5e6227(0x1c6)](_0x1a5195), _0x1a5195[_0x5e6227(0x1f6)] = _0x15da49['deleteUpdate']['bind'](_0x1a5195), _0x1a5195[_0x5e6227(0x1d0)] = _0x25a574[_0x5e6227(0x1c6)](_0x1a5195), _0x1a5195[_0x5e6227(0x1cb)] = _0x11292a[_0x5e6227(0x1c6)](_0x1a5195, !![]), _0x1a5195['ev']['on'](_0x5e6227(0x206), _0x1a5195[_0x5e6227(0x1ef)]), _0x1a5195['ev']['on'](_0x5e6227(0x1bb), _0x1a5195[_0x5e6227(0x1bd)]), _0x1a5195['ev']['on']('groups.update', _0x1a5195[_0x5e6227(0x1f2)]), _0x1a5195['ev']['on'](_0x5e6227(0x212), _0x1a5195[_0x5e6227(0x1f6)]), _0x1a5195['ev']['on'](_0x5e6227(0x1e6), _0x1a5195[_0x5e6227(0x1d0)]), _0x1a5195['ev']['on'](_0x5e6227(0x213), _0x1a5195[_0x5e6227(0x1cb)]), _0x370b7d = ![], !![];
            };
        _0x18d6f8(![]);
    }
    _0xc0dd6f();
};
handler[_0x218002(0x1ed)] = [_0x218002(0x1c7)], handler[_0x218002(0x1fc)] = [_0x218002(0x1f1)], handler[_0x218002(0x210)] = [_0x218002(0x1f1), 'serbot', _0x218002(0x216), _0x218002(0x1c7), _0x218002(0x1dc)], handler[_0x218002(0x207)] = ![];
export default handler;

function sleep(_0x557691) {
    return new Promise(_0x462b86 => setTimeout(_0x462b86, _0x557691));
}