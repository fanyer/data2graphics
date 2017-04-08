#include "iostream"
#include "string"
#include "node.h"

using namespace std;

namespace data2graphics
{

    using v8::Exception;
    using v8::Context;
    using v8::Function;
    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Number;
    using v8::Object;
    using v8::String;
    using v8::Value;


    void Parse(const FunctionCallbackInfo<Value> &args)
    {
        Isolate *isolate = args.GetIsolate();

        cout<<args.Length();

    }

    void init(Local<Object> exports)
    {
        NODE_SET_METHOD(exports, "parse", Parse);
    }



    NODE_MODULE(parser, init);

}
