namespace API.RequestHelpers
{
    public class ProductParams : PaginationsParams
    {
        public string OrderBy { get; set; }

        public string searchTerm { get; set; }

        public string types { get; set; }

        public string Brands { get; set; }
    }
}