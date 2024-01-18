<?php

namespace App\Http\Controllers;

use App\Models\SmsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Response;

class SmsModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $priceListUrl = "https://drive.google.com/uc?export=download&id=1Kj4wzI9rIUXs9ugtOH_PxOC0PktnwnOj";//asset('txt/pricelist.txt');
        $lex_dict = [];
//        $fp = fopen($priceListUrl, "r");
        $fp = file_get_contents($priceListUrl);
        if (!$fp) {
            die("Cannot load file");
        }
        $users = explode("\n",$fp);

//        while (($line = fgets($fp, 4096)) !== false) {
//            list($word, $measure) = explode("\t", trim($line));
//            $lex_dict[] = [$word,$measure];
//     }
//        foreach ($users as $user) {
//            list($word, $measure) = explode(" ", $user);
//            $lex_dict[] = [$word,$measure];
//        }

        foreach ($users as $user) {
            $item = explode("=", $user);
            $position = array_push($lex_dict, $item);
        }

        return view('sendsms', compact( 'priceListUrl', 'lex_dict'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SmsModel $smsModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SmsModel $smsModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SmsModel $smsModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SmsModel $smsModel)
    {
        //
    }


    public function sendsms(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'senderId' => 'min:3|required',
            'phone' => 'required',
            'message' => 'required',
        ]);
        $reqData = $request->all();
        $phonelist = $reqData["phone"];
        $phoneArray = explode(",", trim($phonelist));
        $totalAmout =0.0;
        $loopCount = 0;
        $noOfRecipient= count($phoneArray);
        $priceListUrl = "https://drive.google.com/uc?export=download&id=1Kj4wzI9rIUXs9ugtOH_PxOC0PktnwnOj";//asset('txt/pricelist.txt');
        $data = array();
//        $fp = file_get_contents($priceListUrl);
        $fp = preg_replace(
            '~[\r\n]+~',
            "\r\n",
            trim(file_get_contents($priceListUrl)));
        if (!$fp) {
            die("Cannot load file");
        }
        $pricetxts = explode("\n",$fp);
        $noOfPriceTemp= count($pricetxts);
        $lex_dict = array();
        foreach ($phoneArray as $str) {
            $totalAmout += $this->geteachPrice($pricetxts, $str);
//            foreach ($pricetxts as $pricetxt) {
//                $item = explode("=", $pricetxt);
//                if (str_starts_with($str, $item[0])) {
//                    $totalAmout += floatval($item[1]);
//                }
//
////            $position = array_push($lex_dict, $item);
//            }
        }
//        foreach ($pricetxts as $pricetxt) {
//            $item = explode("=", $pricetxt);
////            if (str_starts_with($str, $item[0])) {
//                $totalAmout += floatval($item[1]);
////            }
//
////            $position = array_push($lex_dict, $item[1]);
//        }
        $data['total-amount'] = $totalAmout;
        $data['no-of-recipient'] = $noOfRecipient;
        $data['phones'] = $phoneArray;
        $data['loopcount'] = $loopCount;
        $data['noOfPriceTemp'] = $noOfPriceTemp;
        $data['priceItem'] = $lex_dict;
//
//        return response()->json(['msg' => null, 'data' => $data, 'success' => true], 200);
//        return Response::json(array('status' => 1, 'message' => "Request Successful", 'data' => $data));
        return Response::json(array('status' => 1, 'message' => "Request Successful", 'data' => $data));
    }

    public  function geteachPrice($pricetxts, $phone)
    {
        foreach ($pricetxts as $pricetxt) {
            $item = explode("=", $pricetxt);
            if (str_starts_with($phone, $item[0])) {
                return floatval($item[1]);
            }

//            $position = array_push($lex_dict, $item);
        }
    }
}
