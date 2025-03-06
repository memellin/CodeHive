"use strict";

var express = require('express');

var Snippet = require('../entities/Snippet');

var router = express.Router(); // verificar se o usuário está autenticado
// criar um snippet

router.post('/', function _callee(req, res) {
  var _req$body, title, code, language, tags, userId, snippet;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, code = _req$body.code, language = _req$body.language, tags = _req$body.tags;
          userId = 1;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(Snippet.create({
            title: title,
            code: code,
            language: language,
            tags: tags,
            userId: userId
          }));

        case 5:
          snippet = _context.sent;
          res.status(201).json(snippet);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          res.status(500).json({
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}); // listar todos os snippets

router.get('/', function _callee2(req, res) {
  var snippets;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Snippet.findAll());

        case 3:
          snippets = _context2.sent;
          res.json(snippets);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/:id', function _callee3(req, res) {
  var id, snippet;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Snippet.findByPk(id));

        case 4:
          snippet = _context3.sent;

          if (snippet) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            error: 'Snippet não encontrado.'
          }));

        case 7:
          res.json(snippet);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            error: _context3.t0.message
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
router.put('/:id', function _callee4(req, res) {
  var id, _req$body2, title, code, language, tags, snippet, updatedSnippet;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, title = _req$body2.title, code = _req$body2.code, language = _req$body2.language, tags = _req$body2.tags;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Snippet.findByPk(id));

        case 5:
          snippet = _context4.sent;

          if (snippet) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: 'Snippet não encontrado.'
          }));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(snippet.update({
            title: title,
            code: code,
            language: language,
            tags: tags
          }));

        case 10:
          updatedSnippet = _context4.sent;
          res.json(updatedSnippet);
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](2);
          res.status(500).json({
            error: _context4.t0.message
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 14]]);
});
router["delete"]('/:id', function _callee5(req, res) {
  var id, snippet;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Snippet.findByPk(id));

        case 4:
          snippet = _context5.sent;

          if (snippet) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: 'Snippet não encontrado.'
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(snippet.destroy());

        case 9:
          res.json({
            message: 'Snippet excluído com sucesso!'
          });
          _context5.next = 15;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json({
            error: _context5.t0.message
          });

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 12]]);
}); // router.get('/tags/:tag', async (req, res) => {
//     const { tag } = req.params;
//     try {
//         const snippets = await Snippet.findAll({
//             where: {
//                 tags: {
//                     [Op.contains]: [tag]
//                 }
//             }
//         });
//         res.json(snippets);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;