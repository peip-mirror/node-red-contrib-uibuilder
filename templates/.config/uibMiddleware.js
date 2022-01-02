/* globals module */
/**
 * Template ExpressJS Middleware for uibuilder.
 * UPDATED: 2022-01-02
 *
 * NOTES & WARNINGS:
 *   1) This function is called EVERY TIME any web call is made to the URL defined by your uib instance.
 *      So it should be kept short and efficient.
 *   2) Failing to either return or call `next()` will cause an ExpressJS error.
 *   3) An error in this function will probably cause Node-RED to fail to start at all.
 *   4) You have to restart Node-RED if you change this file.
 *
 * Allows custom processing for authentication, session management, custom logging, etc.
 * 
 * @param {object} req The ExpressJS request object
 * @param {object} res The ExpressJS result object
 * @param {function} next The callback to hand off to the next middleware
 */
 function uibMw(req,res,next) {

    console.log('[uibuilder:uibMiddleware.js] Custom ExpressJS middleware called.')
    next()

} // Do not forget to end with a call to `next()`

// Uncomment this for example to work.
//module.exports = uibMw