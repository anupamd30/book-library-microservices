using System; class Program { static void Main() { var t = typeof(Microsoft.OpenApi.OpenApiSecuritySchemeReference); foreach (var c in t.GetConstructors()) Console.WriteLine(c.ToString()); } }
