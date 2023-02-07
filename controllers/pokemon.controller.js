const Pokemon = require('../models/pokemon.model');

exports.findPokemons = async (req, res) => {
  try {
    const { count, rows } = await Pokemon.findAndCountAll({
      attributes: ['id', 'name', 'image'],
      where: {
        status: 'available',
      },
    });
    res.status(200).json({
      status: 'success',
      count,
      results: rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.findPokemon = async (req, res) => {
  try {
    const { pokemon } = req;

    res.status(200).json({
      status: 'success',
      message: 'The pokemon was found successfully',
      pokemon,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.createPokemon = async (req, res) => {
  try {
    const { name, image } = req.body;

    const pokemon = await Pokemon.create({
      name: name.toLowerCase(),
      image,
    });

    res.status(200).json({
      status: 'success',
      message: 'the pokemon was created successfully',
      pokemon,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.updatePokemon = async (req, res) => {
  try {
    const { pokemon } = req;
    const { name, image } = req.body;

    await pokemon.update({ name, image });

    res.status(200).json({
      status: 'success',
      message: 'the pokemon was updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.deletePokemon = async (req, res) => {
  try {
    const { pokemon } = req;

    await pokemon.update({ status: 'disabled' });

    res.status(200).json({
      status: 'success',
      message: 'the pokemon was deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
