import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


export function configureSwagger(app) {
   const options = new DocumentBuilder()
     .setTitle('Nest Job Api')
     .setVersion('1.0')
     .build();
   const document = SwaggerModule.createDocument(app, options);
   SwaggerModule.setup('docs', app, document);
 }
 