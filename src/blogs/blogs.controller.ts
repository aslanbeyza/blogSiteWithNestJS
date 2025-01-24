import { Body, Controller, Post, UseGuards ,Request} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('blogs')
export class BlogsController {
    constructor(private blogsService: BlogsService) {}

    @UseGuards(AuthGuard('jwt')) /* tetikliyoz tokeni alıyo onlylıyo */
    /* Ben bu route gidince  ototmatik strategy tetiklenicek ve sistem tokeni benden alıcak verify edicek içindeki payşoad kısmınıda req.user içine koyucak*/
    @Post()
    /* bu dto type ı dto klasöründem gelicek */
    createBlog(@Body() dto: BlogDto, @Request() req:any) {
        console.log("Blogdto,req",dto, req);
        return this.blogsService.createBlog(dto, req);
    }
}

