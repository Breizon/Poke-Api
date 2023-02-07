const { Router } = require('express');
const { check } = require('express-validator');
const {
  findPokemons,
  findPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
} = require('../controllers/pokemon.controller');
const { validExistPokemon } = require('../middlewares/pokemon.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('', findPokemons);

router.get('/:id', validExistPokemon, findPokemon);

router.post(
  '/',
  [
    check('name', 'Pokemon name must be mandatory').not().isEmpty(),
    check('image', 'Pokemon image must be mandatory').not().isEmpty(),
    validateFields,
  ],
  createPokemon
);

router.patch(
  '/:id',
  [
    check('name', 'Pokemon name must be mandatory').not().isEmpty(),
    check('image', 'Pokemon image must be mandatory').not().isEmpty(),
    validateFields,
    validExistPokemon,
  ],
  updatePokemon
);

router.delete('/:id', validExistPokemon, deletePokemon);

module.exports = {
  pokemonRouter: router,
};
