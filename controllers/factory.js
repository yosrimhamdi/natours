const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/appError');

const createOne = Model =>
  catchAsync(async (req, res) => {
    const document = await Model.create(req.body);

    const data = {};
    data[`${Model.collection.name.slice(0, -1)}`] = document;

    res.status(201).json({
      status: 'success',
      data,
    });
  });

const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc) {
      return next(new AppError(`document not found with id ${req.params.id}`, 404));
    }

    const data = {};
    data[`${Model.collection.name.slice(0, -1)}`] = updatedDoc;

    res.status(200).json({
      status: 'success',
      data,
    });
  });

const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError(`document not found with id ${req.params.id}`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

const getOne = Model =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      return next(new AppError(`document not found with id ${req.params.id}`, 404));
    }

    const data = {};
    data[`${Model.collection.name.slice(0, -1)}`] = document;

    res.status(200).json({
      status: 'success',
      data,
    });
  });

const getAll = Model =>
  catchAsync(async (req, res, next) => {
    const filter = req.filter ? req.filter : {};

    const documents = await Model.find(filter);

    const data = {};
    data[`${Model.collection.name}`] = documents;

    res.status(200).json({
      status: 'success',
      results: documents.length,
      data,
    });
  });

module.exports = { createOne, updateOne, deleteOne, getOne, getAll };
