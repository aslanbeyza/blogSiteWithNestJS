import { Body, Controller, Post, UseGuards ,Request, Param, Put, Delete, Get} from '@nestjs/common';
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
        return this.blogsService.createBlog(dto, req);
    }
    @UseGuards(AuthGuard('jwt')) 
    @Put(':id')
    updateBlog(@Body() dto: BlogDto, @Param('id') id: string) {
        console.log("Blogdto, id put",dto, id);
        return this.blogsService.updateBlog(dto, id);
    }
    @UseGuards(AuthGuard('jwt')) 
    @Delete(':id')
    removeBlog( @Param('id') id: string) {
        console.log("id delete", id);
        return this.blogsService.removeBlog( id);
    }
    @Get()
    getAllBlogs() {
        return this.blogsService.getAllBlogs();
    }
    /* sadece kendi paylastıgı bloglar olabilir onu yapalım şimdide */
    @UseGuards(AuthGuard('jwt')) 
    @Get("my-blogs")
     /* Ne lazım burda req lazım çünkü o tokendaki varsa id sini falan cekcez */
       getCurrentUsersBlog(@Request() req:any) {
        //console.log("req",req);
        //console.log(this.blogsService.getCurrentUsersBlog(req));
        return  this.blogsService.getCurrentUsersBlog(req);
    }
    @Get(":id")
    getOneBlog(@Param('id') id: string) {
        return this.blogsService.getOneBlog(id);
    }
    













}

