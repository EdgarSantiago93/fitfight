import Route from '@ioc:Adonis/Core/Route'

// Views
Route.get('/login', 'RoutesController.getLoginView')
Route.get('/entry/:id', 'RoutesController.entryShareCard')
// Actions
Route.get('/logout', 'LogoutAction')
Route.post('/login', 'AttemptLoginAction')

Route.group(() => {
  Route.get('/', 'RoutesController.getDashboardView')
  Route.get('/lb', 'RoutesController.getLeaderBoardView')
  Route.get('/vote', 'RoutesController.getVotingView')
  Route.get('/cal', 'RoutesController.getVotingView') //WIP
  Route.get('/today', 'RoutesController.getTodaysEntriesView') //WIP

  //Actions
  Route.post('/get_media_token', 'GetUploadTokenAction')
  Route.post('/get_signed_url', 'GetPresignedURL.apiHandle')
  Route.post('/create_entry', 'SaveEntryAction')
  Route.post('/vote_on_entry', 'VoteOnEntryAction')
}).middleware('auth')
