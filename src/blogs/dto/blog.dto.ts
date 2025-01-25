export class BlogDto {
    title: string;
    content: string;
    userId?: string;
}

/* Bu kısımda şemada 4 şey belirttik burda niye 2 derseniz eğer 
schemadaki olay collection içine kaydedilişcek şeylerin yapısını belirtiyo
örneğin burda title ve content var ama sharedBy ve userId yok çünkü onlar
otomatik olarak gelecek şeyler bunlar kullanıcıdan alınacak şeyler değil
dto daki olay da şu ;
kullanıcıdan alınan objeyi belirtmek için kullanılır
kullanıcı kimin tarafından yazıldıgını yazmıcak onu otomatık ben yapıcam backendden bunlar frontend kısmından gelicek
*/