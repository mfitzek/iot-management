import { JWT_DEV_SECRET } from '@iot/constants';

import { JwtModule } from '@nestjs/jwt';



const module = JwtModule.register({
    secret: process.env.JWT_SECRET || JWT_DEV_SECRET,
    signOptions: {
      expiresIn: '24h',
    },
  })

export default module;