var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();


app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();



//app.UseEndpoints(endpoints =>
//{
    
//    endpoints.MapGet("/echo",
//        context => context.Response.WriteAsync("echo"))
//        .RequireCors(MyAllowSpecificOrigins);

//    endpoints.MapControllers()
//             .RequireCors(MyAllowSpecificOrigins);

//    endpoints.MapGet("/echo2",
//        context => context.Response.WriteAsync("echo2"));

//});

app.Run();
