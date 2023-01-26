import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

// export default class extends BaseSeeder {
//   public async run () {
//     // Write your database queries inside the run method
//   }
// }

import User from 'App/Models/User'
export default class UserSeeder extends BaseSeeder {

  public async run () {
    await User.createMany([
      {
        avatar: '/img/bartolos/eesg.png',
        name: 'Edgar',
        email: 'eesg@fitfight.com',
        password:'bartolos'
      },
      {
        avatar: '/img/bartolos/aag.png',
        name: 'Alonso',
        email: 'aag@fitfight.com',
        password:'bartolos'
      },
      {
        avatar: '/img/bartolos/acib.png',
        name: 'Alex',
        email: 'acib@fitfight.com',
        password:'bartolos'
      },
      {
        avatar: '/img/bartolos/amm.png',
        name: 'Andres',
        email: 'amm@fitfight.com',
        password:'bartolos'
      },
      {
        avatar: '/img/bartolos/astc.png',
        name: 'Adolfo',
        email: 'astc@fitfight.com',
        password:'bartolos'
      },
     
      {
        avatar: '/img/bartolos/cgs.png',
        name: 'Carlos',
        email: 'cgs@fitfight.com',
        password:'bartolos'
      },
     
      {
        avatar: '/img/bartolos/jacm.png',
        name: 'Cossio',
        email: 'jacm@fitfight.com',
        password:'bartolos'
      },
       
      {
        avatar: '/img/bartolos/rlzo.png',
        name: 'Ricardo',
        email: 'rlzo@fitfight.com',
        password:'bartolos'
      },
      {
        avatar: '/img/bartolos/rrm.png',
        name: 'Rafa',
        email: 'rrm@fitfight.com',
        password:'bartolos'
      },
      {
        avatar: '/img/bartolos/lesa.png',
        name: 'Santoyo',
        email: 'lesa@fitfight.com',
        password:'bartolos'
      },
      {
        avatar: '/img/bartolos/lmlr.png',
        name: 'LuisMi',
        email: 'lmlr@fitfight.com',
        password:'bartolos'
      },
      {
        avatar: '/img/bartolos/lmvs.png',
        name: 'Luiso',
        email: 'lmvs@fitfight.com',
        password:'bartolos'
      }
    ])
  }

}