/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'RoutesController.getLoginView')

Route.get('/logout', 'LogoutController')

Route.post('/login', 'AttemptLoginController')

Route.get('/entry/:id', 'RoutesController.entryShareCard')

Route.get('/', 'RoutesController.getDashboardView').middleware('auth')
Route.get('/lb', 'RoutesController.getLeaderBoardView').middleware('auth')
Route.get('/vote', 'RoutesController.getVotingView').middleware('auth')
Route.get('/cal', 'RoutesController.getVotingView').middleware('auth')

Route.post('/get_media_token', 'GetUploadToken').middleware('auth')

Route.post('/get_signed_url', 'GetPresignedURL.apiHandle').middleware('auth')

Route.post('/create_entry', 'SaveEntry').middleware('auth')
