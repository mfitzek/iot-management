import { JwtModule } from '@nestjs/jwt';

const secret = process.env.JWT_SECRET || 'notSoSecretJwtToken';

const module = JwtModule.register({
  secret: secret,
  signOptions: {
    expiresIn: '24h',
  },
});

export default module;
